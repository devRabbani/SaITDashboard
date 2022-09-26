import { useContext, useState } from 'react'
import { useEffect } from 'react'
import { createContext } from 'react'
import { getProfile } from '../utils/firebase'

export const ProfileContext = createContext(null)
export const useProfile = () => useContext(ProfileContext)
