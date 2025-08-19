"use client";

import { changeDescription } from "../_actions/change-bio";
import { ChangeEvent, useState, useRef } from "react";
import { debounce } from "lodash";
import { toast } from "sonner";

const Description = ({
  initialDescription,
}: {
  initialDescription: string;
}) => {
  const [description, setDescription] = useState(initialDescription);
  const [originalDescription] = useState(initialDescription);

  const debouncedSaveDescription = useRef(
    debounce(async (currentDescription: string) => {
      if (currentDescription.trim() === "") {
        setDescription(originalDescription);
        return;
      }

      if (currentDescription !== description) {
        try {
          const response = await changeDescription({
            description: currentDescription,
          });

          if (response.error) {
            setDescription(originalDescription);
            toast.error(response.error);
            return;
          }

          toast.success("Bio atualizada com sucesso!");
        } catch (error) {
          setDescription(originalDescription);
        }
      }
    }, 500)
  ).current;

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setDescription(value);

    debouncedSaveDescription(value);
  }

  return (
    <div>
      <textarea
        className="text-base bg-gray-50 border border-gray-400 rounded-md outline-nome p-2 w-full max-w-2xl my-3 h-40 resize-none"
        value={description}
        onChange={handleChange}
      />
    </div>
  );
};

export default Description;
