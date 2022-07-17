import { CONTEXT } from "../../contexts/contexts";

export interface Permission {
    name: string;
    description: string;
    context: CONTEXT;
}
