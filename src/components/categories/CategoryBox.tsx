import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "../ui/button";

type CategoryBoxProps = {
  name: string;
  type: "INCOME" | "EXPENSE";
  id: string;
};

const CategoryBox = ({ name, type }: CategoryBoxProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Button asChild variant={type === "INCOME" ? "default" : "destructive"}>
          <div>{name}</div>
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default CategoryBox;
