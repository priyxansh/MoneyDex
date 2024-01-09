import { Button } from "../ui/button";
import DeleteCategoryMenuItem from "./DeleteCategoryMenuItem";
import EditCategoryDialog from "./EditCategoryDialog";
import { DialogTrigger } from "../ui/dialog";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { TransactionCategoryType } from "@prisma/client";

type CategoryBoxProps = {
  name: string;
  type: TransactionCategoryType;
  id: string;
};

const CategoryBox = ({ name, type, id }: CategoryBoxProps) => {
  return (
    <EditCategoryDialog id={id} name={name} type={type}>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Button
            asChild
            variant={type === "INCOME" ? "default" : "destructive"}
          >
            <div>{name}</div>
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <DialogTrigger asChild>
            <ContextMenuItem>Edit</ContextMenuItem>
          </DialogTrigger>
          <DeleteCategoryMenuItem id={id} />
        </ContextMenuContent>
      </ContextMenu>
    </EditCategoryDialog>
  );
};

export default CategoryBox;
