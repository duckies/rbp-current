export const useWowhead = () => {
  /**
   * Instructs Wowhead to scan for links and update them.
   * Used after a known rerender, e.g. dynamic markdown content.
   *  */
  const reload = () => {
    window?.$WowheadPower?.refreshLinks()
  }

  return { reload }
}
