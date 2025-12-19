


function abortSignalTimeout() {
  if(typeof AbortSignal === "undefined") return false
  if(typeof AbortSignal.timeout === "undefined") return false
  return true
}

// reference: https://web.dev/patterns/files/open-one-or-multiple-files
function fileSystemAccessAPI() {
  const supportsFileSystemAccess =
    "showOpenFilePicker" in window &&
    (() => {
      try {
        return window.self === window.top;
      } catch {
        return false;
      }
    })();
  
  return supportsFileSystemAccess
}


export default {
  abortSignalTimeout,
  fileSystemAccessAPI,
}