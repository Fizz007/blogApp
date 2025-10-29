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
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],

  // 👇 This makes the list look clean
  preview: {
    select: {
      title: 'text',
      postTitle: 'post.title',
    },
    prepare(selection) {
      const { title, postTitle } = selection;
      return {
        title: title ? title : 'No comment text',
        subtitle: postTitle ? `Post: ${postTitle}` : 'Unlinked post',
      };
    },
  },
};
