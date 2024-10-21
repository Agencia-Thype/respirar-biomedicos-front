import { z } from "zod";
import { baseCategorySchema, categorySchemaData } from "../schemas/category.schemas";

export interface categoriesContextData {
  data: ICategoryData[] | undefined;
  isFetching: boolean;
  refetch: () => Promise<void>; // Adicione esta linha
  // createCategory: (data: ICategoryDataRequest) => void;
}



export type ICategoryData = z.infer<typeof baseCategorySchema>;
export type ICategoryDataRequest = z.infer<typeof categorySchemaData>
