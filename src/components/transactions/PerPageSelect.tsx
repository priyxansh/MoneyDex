"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";

type PerPageSelectProps = {
  page: number;
  perPage: number;
  paramsFilter?: string;
};

const PerPageSelect = ({ page, perPage, paramsFilter }: PerPageSelectProps) => {
  const router = useRouter();

  const onValueChange = (value: string) => {
    const params = new URLSearchParams();

    params.set("page", `${page}`);
    params.set("perPage", value);
    paramsFilter && params.set("filter", paramsFilter);

    router.push(`?${params.toString()}`);
  };

  return (
    <Select defaultValue={`${perPage}`} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <span>Per page:</span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        ref={(ref) => {
          if (!ref) return;
          ref.ontouchstart = (e) => {
            e.preventDefault();
          };
        }}
      >
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="15">15</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="25">25</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="100">100</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default PerPageSelect;
