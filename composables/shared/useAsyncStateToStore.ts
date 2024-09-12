import { watchEffect } from "vue";
import { useAsyncState } from "@vueuse/core";
import type { Store } from "pinia";

const isStateEmpty = (value: unknown) => {
  if (!value) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object" && value !== null)
    return Object.keys(value).length === 0;

  return false;
};

const useAsyncStateToStore = (
  promise: Promise<any> | (() => Promise<any>),
  store: Store,
  targetStateName: string,
  initialValue: any,
  { rewriteState, immediate } = { rewriteState: false, immediate: true }
) => {
  // const storeAdapter = new Context.StoreAdapter(store)
  // Context.StoreAdapter.patch = this.store.$patch
  // Context.StoreAdapter = PiniaStoreAdapter
  const targetState = store[targetStateName as keyof Store];
  let executePromise;

  if (!rewriteState && isStateEmpty(targetState)) {
    store.$reset();
    const { state, isReady, isLoading, error, execute } = useAsyncState(
      promise,
      initialValue,
      {
        immediate,
      }
    );
    executePromise = execute;
    watchEffect(() => {
      store.$patch({
        [targetStateName]: state.value,
        isReady: !!isReady.value,
        isLoading: !!isLoading.value,
        error: error.value,
      });
    });
  }
  return { executePromise };
};

export { useAsyncStateToStore };
