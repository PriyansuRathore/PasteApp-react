import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload
      const index = state.pastes.findIndex((item) => item._id === paste._id)

      if (index >= 0) {
        // If the course is already in the Pastes, do not modify the quantity
        toast.error("Paste already exist")
        return
      }
      // If the course is not in the Pastes, add it to the Pastes
      state.pastes.push(paste)
      
      // Update to localstorage
      localStorage.setItem("pastes", JSON.stringify(state.pastes))
      // show toast
      toast.success("Paste added")
    },

    updatePastes: (state, action) => {
      const paste = action.payload
      const index = state.pastes.findIndex((item) => item._id === paste._id)

      if (index >= 0) {
        // If the course is found in the Pastes, update it
        state.pastes[index] = paste
        // Update to localstorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        // show toast
        toast.success("Paste updated")
      }
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload

      console.log(pasteId)
      const index = state.pastes.findIndex((item) => item._id === pasteId)

      if (index >= 0) {
        // If the course is found in the Pastes, remove it
        state.pastes.splice(index, 1)
        // Update to localstorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        // show toast
        toast.success("Paste deleted")
      }
    },
    resetPaste: (state) => {
      state.pastes = []
      // Update to localstorage
      localStorage.removeItem("pastes")
    },
    incrementViews: (state, action) => {
      const pasteId = action.payload
      const index = state.pastes.findIndex((item) => item._id === pasteId)
      
      if (index >= 0) {
        state.pastes[index].views = (state.pastes[index].views || 0) + 1
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
      }
    },
    incrementShares: (state, action) => {
      const pasteId = action.payload
      const index = state.pastes.findIndex((item) => item._id === pasteId)
      
      if (index >= 0) {
        state.pastes[index].shares = (state.pastes[index].shares || 0) + 1
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
      }
    },
    toggleFavorite: (state, action) => {
      const pasteId = action.payload
      const index = state.pastes.findIndex((item) => item._id === pasteId)
      
      if (index >= 0) {
        state.pastes[index].isFavorite = !state.pastes[index].isFavorite
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        toast.success(state.pastes[index].isFavorite ? "Added to favorites" : "Removed from favorites")
      }
    },
    importPastes: (state, action) => {
      const importedPastes = action.payload
      state.pastes = [...state.pastes, ...importedPastes]
      localStorage.setItem("pastes", JSON.stringify(state.pastes))
      toast.success(`Imported ${importedPastes.length} pastes successfully!`)
    },
  },
})

export const { addToPastes, removeFromPastes, updatePastes, incrementViews, incrementShares, toggleFavorite, importPastes } = pasteSlice.actions

export default pasteSlice.reducer