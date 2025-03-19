import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Idea } from "../utils/types/types";

interface IdeaTileProps {
  idea: Idea;
  updateIdea: (title: string, content: string, id: string) => void;
  deleteIdea: (id: string) => void;
}

interface IdeaFormData {
  title: string;
  content: string;
}

export default function IdeaTile({
  idea,
  updateIdea,
  deleteIdea,
}: IdeaTileProps) {
  const { register, handleSubmit, setFocus, watch } = useForm({
    defaultValues: {
      title: idea.title,
      content: idea.content,
    },
  });
  const charLimit = 140;
  const watchContent = watch("content");

  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  function getDateTime() {
    if (idea.updatedTimestamp) {
      return `Updated at ${new Date(idea.updatedTimestamp).toLocaleString()}`;
    }
    return `Created at ${new Date(idea.createdTimestamp).toLocaleString()}`;
  }

  function onKeyDown(
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (event.key === "Enter" || event.key === "Escape") {
      event.currentTarget.blur();
    }
  }

  function onSubmit(data: IdeaFormData) {
    if (data.title !== idea.title || data.content !== idea.content) {
      updateIdea(data.title, data.content, idea.id);
    }
  }

  return (
    <form
      className="bg-primary-light border-primary-accent text-primary-dark grid w-full gap-y-4 rounded-md border-[1px] p-4"
      id={idea.id}
    >
      <input
        {...register("title", { maxLength: 25 })}
        type="text"
        aria-label="Idea title"
        className="focus:outline-secondary-accent text-2xl focus:outline-1"
        placeholder="Title"
        onKeyDown={onKeyDown}
        onBlur={handleSubmit(onSubmit)}
      />
      <textarea
        {...register("content", {
          maxLength: 140,
        })}
        rows={5}
        aria-label="Idea content"
        className="focus:outline-secondary-accent max-w-full resize-none overflow-hidden focus:outline-1"
        placeholder="Idea"
        onBlur={handleSubmit(onSubmit)}
        onKeyDown={onKeyDown}
      ></textarea>
      <p
        className={`text-action-negative px-2 text-right text-sm ${watchContent.length >= 120 ? "visible" : "invisible"}`}
      >
        {watchContent.length}/{charLimit}
      </p>
      <footer className="flex w-full items-center justify-between px-2">
        <p className="text-sm">{getDateTime()}</p>
        <button
          type="button"
          className="bg-secondary-accent focus:bg-action-negative rounded-sm p-2 text-white focus:outline-0"
          onClick={() => deleteIdea(idea.id)}
        >
          Delete
        </button>
      </footer>
    </form>
  );
}
