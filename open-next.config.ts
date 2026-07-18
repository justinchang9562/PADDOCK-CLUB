import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// R2-backed caching can be added later if durable incremental caching is
// needed across Worker instances.
export default defineCloudflareConfig();
