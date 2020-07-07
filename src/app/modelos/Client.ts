export interface Client {
    branch_id: number;
    company_id: number;
    branch_name: string;
    branch_adress_1?: string;
    branch_adress_2?: string;
    comuna_id?: number;
    url_location_map?: string;
    name_link?: string;
}