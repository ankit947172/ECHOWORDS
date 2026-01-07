"use client";

import { createThought, FormState } from "@/actions/thought-actions";
import { useActionState } from "react";
import { useRef } from "react";

const initialState: FormState = {
  success: false,
  message: "",
  errors: {},
};

export function ThoughtForm() {
  const [state, formAction, isPending] = useActionState(
    createThought,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  if (state.success && formRef.current) {
    formRef.current.reset();
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mb-8 p-6 border rounded-lg shadow-sm bg-white"
    >
      <label htmlFor="content" className="sr-only">
        Share your thought
      </label>

      <textarea
        name="content"
        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-md text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-black focus:outline-none resize-none text-lg"
        placeholder="Share your thought (Max 60 words)..."
        rows={3}
        disabled={isPending}
      />

      {state.errors?.content && (
        <p className="text-red-500 text-sm mt-2 font-medium">
          {state.errors.content[0]}
        </p>
      )}

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          disabled={isPending}
          className="bg-black text-white px-6 py-2 rounded-md font-bold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Echoing..." : "Echo"}
        </button>
      </div>
    </form>
  );
}
