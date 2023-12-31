import { format } from 'date-fns';
import * as yup from 'yup';

export const eventModelValidationSchema = yup.object().shape({
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
                if(startDate === null || endDate === null)
                    return false;
                const formattedStartDate = format(startDate, 'yyyy-MM-dd');
                return formattedStartDate <= formattedEndDate;
            },
        }),
    allDay: yup.boolean(),
    startTime: yup
        .date()
        .when(['allDay'], {
            is: false,
            then: () => yup.date().required('Start time is required'),
        }),
    notes: yup
        .string(),
});