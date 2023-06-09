import * as zod from 'zod';

const E_CONTENT_MAX_LENGTH = 'メモの最大文字数は5000文字です。';

export const ContentScheam = zod.z.object({
  content: zod.string().max(5000, E_CONTENT_MAX_LENGTH),
});
export type IContent = zod.infer<typeof ContentScheam>;
export class Content implements IContent {
  constructor(public readonly content: string) {
    ContentScheam.parse({content});
  }
  static new(content: string) {
    return new Content(content);
  }
}
