/** WebGL probe. Releases the probe context immediately so it does not count against the browser's limit. */
export function detectWebGL() {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    if (!gl) return false
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}

/** True when the visitor asked the browser to save data; we skip the 3D download then. */
export function prefersSavingData() {
  // navigator.connection is only available in some browsers, so it may be undefined.
  return navigator.connection?.saveData === true
}
