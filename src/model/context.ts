import { IBathrobeContext } from "./types";
import { createContext } from 'react'

export const BathrobeContext = createContext<IBathrobeContext<any>>(null!)
