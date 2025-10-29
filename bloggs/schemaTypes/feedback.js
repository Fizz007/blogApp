export default {
  name: "feedback",
  title: "Feedback",
  type: "document",
  fields: [
    {
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "post" }],
    },
    {
      name: "userId",
      title: "User ID",
      type: "string",
    },
    {
      name: "feedback",
      title: "Feedback",
      type: "string",
      options: {
        list: [
          { title: "Like", value: "like" },
          { title: "Dislike", value: "dislike" },
        ],
      },
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
  ],

  // 👇 Nice preview display
  preview: {
    select: {
      title: 'feedback',
      postTitle: 'post.title',
      userId: 'userId',
    },
    prepare({ title, postTitle, userId }) {
      return {
        title: title ? `${title.charAt(0).toUpperCase() + title.slice(1)}` : 'No feedback',
        subtitle: `${postTitle ? postTitle : 'Unlinked post'}${userId ? ` • User: ${userId}` : ''}`,
      };
    },
  },
};
