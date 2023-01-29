import type { Strategy } from "content"
import { allStrategies } from "content"

type Instance = {
  name: string
  slug: string
  strategies: Strategy[]
}

export const InstanceStrategies = allStrategies.reduce((instances, strategy, i) => {
  if (!strategy.instance) {
    console.warn("Strategy without instance", strategy)
    return instances
  }

  let instance = instances.find((i) => i.slug === strategy.instance.slug)

  if (instance) {
    instance.strategies.push(strategy)
  } else {
    instance = {
      name: strategy.instance.name,
      slug: strategy.instance.slug,
      strategies: [strategy],
    }

    instances.push(instance)
  }

  if (i === allStrategies.length - 1) {
    instance.strategies.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  return instances
}, [] as Instance[])
