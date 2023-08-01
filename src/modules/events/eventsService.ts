// import { getEvents } from './api/eventsApi'

// const loadAndSaveEvents = async (store, storeKey) => {
//   //if store.get(storeKey) is not empty return
//   const storeAdapter = Context.StoreAdapter(store)
//   try {
//     storeAdapter.patch({ isLoading: true })
//     const events = await getEvents()
//     storeAdapter.patch({ [storeKey]: events })
//   } catch (error) {
//     storeAdapter.patch({ error })
//     throw error
//   } finally {
//     storeAdapter.patch({ isLoading: false })
//   }
// }

// export { loadAndSaveEvents }

/// in IndexView
// eventsStore = useEventsStore()
// loadAndSaveEvents(eventsStore, events)
//
