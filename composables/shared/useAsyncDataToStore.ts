import { watchEffect } from "vue";
import type { Store } from "pinia";
import type { NuxtApp } from "#app";

const isStateEmpty = (value: unknown) => {
  if (!value) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object" && value !== null)
    return Object.keys(value).length === 0;

  return false;
};

const useAsyncDataToStore = async (
  promise: (ctx?: NuxtApp | undefined) => Promise<any>,
  store: Store,
  targetStateName: string,
  { rewriteState } = { rewriteState: false }
  // { rewriteState, immediate } = { rewriteState: false, immediate: true }
) => {
  const targetState = store[targetStateName as keyof Store];

  if (!rewriteState && isStateEmpty(targetState)) {
    store.$reset();
    const { data, status, error } = await useAsyncData(
      targetStateName,
      promise
    );
    watchEffect(() => {
      store.$patch({
        [targetStateName]: data.value,
        isReady: status.value === "success",
        isLoading: status.value === "pending",
        error: error.value,
      });
    });
  }
  // return { executePromise };
};

export { useAsyncDataToStore };
