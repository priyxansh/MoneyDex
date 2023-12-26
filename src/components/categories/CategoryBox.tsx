import { Button } from "../ui/button";
import DeleteCategoryMenuItem from "./DeleteCategoryMenuItem";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

type CategoryBoxProps = {
  name: string;
  type: "INCOME" | "EXPENSE";
  id: string;
};

const CategoryBox = ({ name, type, id }: CategoryBoxProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Button asChild variant={type === "INCOME" ? "default" : "destructive"}>
          <div>{name}</div>
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Edit</ContextMenuItem>
        <DeleteCategoryMenuItem id={id} />
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default CategoryBox;
