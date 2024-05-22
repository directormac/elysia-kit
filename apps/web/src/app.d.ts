// See https://kit.svelte.dev/docs/types#app

import type { ClientType } from '$lib';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      api: ClientType;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
