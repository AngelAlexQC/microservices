import { CONTEXT } from "../../contexts/contexts";

export default interface Permission {
    name: string;
    description: string;
    context: CONTEXT;
}
