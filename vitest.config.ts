import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['katas/in-progress/**/*.ts']
  }
})
