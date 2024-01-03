"use client";

import { deleteCategory } from "@/actions/category-actions";
import { ContextMenuItem } from "../ui/context-menu";
import { toast } from "sonner";

type DeleteCategoryMenuItemProps = {
  id: string;
};

const DeleteCategoryMenuItem = ({ id }: DeleteCategoryMenuItemProps) => {
  const onClick = async () => {
    const result = await deleteCategory(id);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
  };

  return <ContextMenuItem onClick={onClick}>Delete</ContextMenuItem>;
};

export default DeleteCategoryMenuItem;
