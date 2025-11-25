import { defineField, defineType } from "sanity";

export default defineType({
  name: "magazine",
  title: "Magazine",
  type: "document",
  fields: [
    defineField({
      name: "pages",
      title: "Magazine Pages (Images)",
      description: "أضف الصور هنا - يمكنك إضافة أي عدد تريده وسحبها لترتيبها",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("يجب إضافة صورة واحدة على الأقل"),
    }),
    defineField({
      name: "isActive",
      title: "Active",
      description: "فعّل لإظهار المجلة في الموقع",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "pages.0",
    },
    prepare({ title, media }) {
      return {
        title: title || "Untitled Magazine",
        subtitle: `${media ? "Has images" : "No images yet"}`,
        media: media,
      };
    },
  },
});
