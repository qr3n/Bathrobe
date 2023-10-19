# Bathrobe
A library that simplifies context management in steps. Animations are provided as a bonus.

# How to use

```tsx
import { BathrobeProvider, useBathrobeContext, useSteps } from "bathrobe";
import { useState } from 'react'

interface ISomeContextData {
  hello: string,
  world: string
}

const SomeSteps = () => {
  const steps = useSteps<ISomeContextData>(3, {
    hello: 'Hello',
    world: 'World'
  })

  return (
    <BathrobeProvider steps={steps}>
      <Step1/>
      <Step2/>
    </BathrobeProvider>
  )
}

const Step1 = () => {
  const { hello } = useBathrobeContext<ISomeContextData>()
  
  return (
    <h1>
      { hello }
    </h1>
  )
}

const Step2 = () => {
  const { world } = useBathrobeContext<ISomeContextData>()

  return (
    <h1>
      { world }
    </h1>
  )
}
```