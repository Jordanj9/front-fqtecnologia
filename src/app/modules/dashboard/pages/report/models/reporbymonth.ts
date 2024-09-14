
export interface ReportByMonth {
    message: string;
    data: [
        {
            id: number;
            month: string;
            total_value: number;
        }
    ];
    status: number;
}

export interface ReportByType{
    message: string;
    status: number;
    data:[
        {
            type: string;
            total: number;
        }
    ]
}
