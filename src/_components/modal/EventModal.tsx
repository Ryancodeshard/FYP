'use client'

import { useState, useEffect } from "react"
import popUpBoxStyle from "./eventModalStyle";
import { FormikValues, useFormik } from "formik";

import { eventModelValidationSchema } from "../_models/eventModelValidator";
import { EventModel } from "../_models/EventModel";
import { Button, Checkbox, FormControlLabel, FormGroup, FormHelperText, Grid, TextField, Typography, } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { add, startOfDay, startOfHour } from "date-fns";

interface EventModalProps {
    date: Date;
}

const EventModal = (props: EventModalProps) => {
    const { date } = props;
    const [eventData, setEventData] = useState<EventModel>(EventModel.getInitialEventValues());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [eventTitle, setEventTitle] = useState(eventData.title);
    
    /*TO-DO: Create a new useEffect to replace the data with actual data if eventData.id != -1 */
    useEffect(() => {
        eventData.startDate = date;
        eventData.endDate = date;
        eventData.startTime = add(startOfHour(date), { hours: 1 });
        eventData.endTime = add(startOfHour(date), { hours: 2 });
    },[date])

    const initialDate = startOfDay(date);
    /*TO-DO: change validateOnBlur and validateOnChange */
    const formik = useFormik({
        initialValues: eventData,
        validationSchema: eventModelValidationSchema,
        onSubmit: (values: FormikValues) => {
            setIsSubmitting(true);
            const wrappedValues = {
                id: eventData.ID,
                title: eventTitle,
                startDate: values.startDate,
                endDate: values.endDate,
                allDay: values.allDay,
                startTime: values.startTime,
                endTime: values.endTime,
                notes: values.notes,
            };
            alert(JSON.stringify(wrappedValues,null,2));
        },
        validateOnBlur: true,
        validateOnChange: true,
    })
    console.log(formik.values.allDay);
    return (
        <div style={{top: '0',left: '0', zIndex: 1030, borderRadius: '8px', width: '95vw'}}>
            <div style={popUpBoxStyle.validationBox as React.CSSProperties}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        label="Title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={Boolean(formik.errors.title && formik.touched.title)}
                        helperText={formik.errors.title && formik.touched.title ? String(formik.errors.title) : undefined}
                    />
                    <Grid container sx={{width: '100%', justifyContent: 'left'}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Grid item>
                                <DatePicker
                                    name="startDate"
                                    defaultValue={initialDate}
                                    format="dd-MM-yyyy"
                                    onChange={(newDate) => {
                                        formik.setFieldValue("startDate",newDate)
                                    }}
                                    sx={{ width: '150px'}}
                                />
                                {!formik.values.allDay && (
                                    <TimePicker
                                        value={formik.values.startTime}
                                        onChange={(newValue) => formik.setFieldValue("startTime", newValue)}
                                        referenceDate={formik.values.startTime}
                                        sx={{ width: '140px'}}
                                    />
                                )}
                            </Grid>
                            <Grid item>
                                <DatePicker
                                    name="endDate"
                                    defaultValue={initialDate}
                                    format="dd-MM-yyyy"
                                    onChange={(newDate) => formik.setFieldValue("endDate",newDate)}
                                    sx={{ width: '150px'}}
                                />
                                {!formik.values.allDay && (
                                    <TimePicker
                                        value={formik.values.endTime}
                                        onChange={(newValue) => formik.setFieldValue("endTime", newValue)}
                                        referenceDate={formik.values.endTime}
                                        sx={{ width: '140px'}}
                                    />
                                )}
                            </Grid>
                        </LocalizationProvider>
                        <FormHelperText sx={{color: 'red',width: '100%'}}>{formik.errors.startDate ? String(formik.errors.startDate) : ""}</FormHelperText>
                    </Grid>
                    <FormGroup itemType="button">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="allDay"
                                    defaultChecked={formik.values.allDay}
                                    onChange={(event) => formik.setFieldValue("allDay", event.target.checked)}
                                />
                            }
                            label="All Day"
                            sx={{ width: '30%', color: 'black'}}
                        />
                    </FormGroup>
                    <TextField
                        fullWidth
                        id="notes"
                        name="notes"
                        label="Description"
                        value={formik.values.notes}
                        onChange={formik.handleChange}
                    />
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    )
    
}

export default EventModal;