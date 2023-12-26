"use client";

import { deleteCategory } from "@/actions/category-actions";
import { ContextMenuItem } from "../ui/context-menu";
import { useToast } from "../ui/use-toast";

type DeleteCategoryMenuItemProps = {
  id: string;
};

const DeleteCategoryMenuItem = ({ id }: DeleteCategoryMenuItemProps) => {
  const { toast } = useToast();

  const onClick = async () => {
    const result = await deleteCategory(id);

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error.message,
      });
      return;
    }
  };

  return <ContextMenuItem onClick={onClick}>Delete</ContextMenuItem>;
};

export default DeleteCategoryMenuItem;
