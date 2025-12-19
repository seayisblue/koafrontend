/// <reference types="vite/client" />
declare module 'virtual:svg-icons-register';

interface LiuEnv {
  version: string
}

declare const LIU_ENV: LiuEnv

/******************************** View Transition API ****************************/
interface ViewTransition {
  readonly ready: Promise<undefined>;
  readonly finished: Promise<undefined>;
  readonly updateCallbackDone: Promise<undefined>;
  skipTransition(): void;
}


/******************************** File System Access API ****************************/
// Reference: 
// https://github.com/jsxtools/show-open-file-picker/blob/main/showOpenFilePicker.d.ts
interface FilePickerAcceptType {
	/** A string that describes the file type. */
	description?: string

	/**
	 * An array of content types or file extensions that can be selected.
	 * @example
	 * ```js
	 * [
	 *   {
	 *     description: "Images",
	 *     accept: {
	 *       "image/*": [".png", ".gif", ".jpeg", ".jpg"]
	 *     }
	 *   }
	 * ]
	 * ```
	*/
	accept: Record<string, string[]>
}

interface ShowOpenFilePickerOptions {
	/** A boolean that indicates whether the picker should let the user apply file type filters. By default, this is `false`. */
	excludeAcceptAllOption?: boolean

	/** An ID to be associated with the directory. If the same ID is used for another picker, it will open the same directory. */
	id?: string

	/** A boolean that indicates whether the user can select multiple files. By default, this is `false`. */
	multiple?: boolean

	/** A well known directory ("desktop", "downloads") or `FileSystemHandle` to open the dialog in. */
	startIn?: string | FileSystemDirectoryHandle
	types?: FilePickerAcceptType[]
}

interface Window {
  showOpenFilePicker(options?: ShowOpenFilePickerOptions): Promise<FileSystemFileHandle[]>
}

// extend File
interface File {
	handle?: FileSystemFileHandle
}


interface CSSStyleDeclaration {
  viewTransitionName: string;
}

declare module 'another-vue3-blurhash' {
  import { DefineComponent } from 'vue';
  export const BlurHashCanvas: DefineComponent<any, any, any>;
}
