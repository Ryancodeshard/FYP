import { format } from 'date-fns';
import * as yup from 'yup';

export const eventModelValidationSchema = yup.object({
    title: yup
        .string()
        .required('Title is required'),
    startDate: yup
        .date()
        .required('Please input start date'),
    endDate: yup
        .date()
        .required('Please input end date')
        .test({
            name: 'endDateAfterStartDate',
            message: 'Enter valid date',
            test: function (endDate) {
                const formattedEndDate = format(endDate, 'yyyy-MM-dd');
                const startDate = this.parent.startDate;
                const formattedStartDate = format(startDate, 'yyyy-MM-dd');
                return formattedStartDate <= formattedEndDate;
            },
        }),
    notes: yup
        .string(),
    allDay: yup
        .boolean()
});