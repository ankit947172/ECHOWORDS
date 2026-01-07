"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// ✅ FIX: Define and Export FormState
export type FormState = {
  success: boolean;
  message?: string;
  errors?: {
    content?: string[];
  };
};

const thoughtSchema = z.object({
  content: z
    .string()
    .min(1)
    .refine(
      (val) => {
        return val.trim().split(/\s+/).length <= 60;
      },
      {
        message: "Strictly 60 words or less.",
      }
    ),
});

export async function createThought(
  prevState: any,
  formData: FormData
): Promise<FormState> {
  // ✅ Optional: Added return type for safety
  const content = formData.get("content") as string;
  const validatedFields = thoughtSchema.safeParse({ content });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await db.thought.create({
      data: { content: validatedFields.data.content },
    });
    revalidatePath("/");
    return { success: true, message: "Posted!" };
  } catch (e) {
    return { success: false, message: "Database Error" };
  }
}
