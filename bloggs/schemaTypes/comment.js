// schemas/comment.js
export default {
  name: 'comment',
  title: 'Comments',
  type: 'document',
  fields: [
    {
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
    },
    {
      name: 'text',
      title: 'Comment Text',
      type: 'text',
    },
    {
      name: 'feedback',
      title: 'Feedback',
      type: 'string',
      options: {
        list: [
          { title: 'Like', value: 'like' },
          { title: 'Dislike', value: 'dislike' },
        ],
      },
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
}
