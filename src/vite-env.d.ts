/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

interface ImportMeta {
  readonly hot?: {
    accept(): void
  }
}

declare module '*.css' {
  const content: string
  export default content
}

declare module '*.scss' {
  const content: string
  export default content
}

declare module '*.sass' {
  const content: string
  export default content
}

declare module '*.less' {
  const content: string
  export default content
}

declare module '*.styl' {
  const content: string
  export default content
} 