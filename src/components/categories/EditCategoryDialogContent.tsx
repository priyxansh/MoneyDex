import EditCategoryForm from "./EditCategoryForm";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type EditCategoryDialogContentProps = {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
  closeDialog: () => void;
};

const EditCategoryDialogContent = ({
  id,
  name,
  type,
  closeDialog
}: EditCategoryDialogContentProps) => {
  return (
    <DialogContent className="max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogDescription>
          Edit Transaction Category here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <EditCategoryForm id={id} name={name} type={type} closeDialog={closeDialog} />
    </DialogContent>
  );
};

export default EditCategoryDialogContent;
