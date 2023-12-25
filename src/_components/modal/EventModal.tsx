'use client'

import { useState, useEffect } from "react"
import popUpBoxStyle from "./eventModalStyle";
import { FormikValues, useFormik } from "formik";

import { eventModelValidationSchema } from "../_models/eventModelValidator";
import { EventModel } from "../_models/EventModel";
import { Button, Checkbox, FormControlLabel, FormGroup, FormHelperText, Grid, TextField, IconButton } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { add, startOfDay, startOfHour } from "date-fns";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotesIcon from '@mui/icons-material/Notes';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import CloseIcon from '@mui/icons-material/Close';

interface EventModalProps {
    date: Date;
    handleModalClose: any;
}

const EventModal = (props: EventModalProps) => {
    const { date, handleModalClose } = props;
    const [eventData, setEventData] = useState<EventModel>(EventModel.getInitialEventValues());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [startTime, setStartTime] = useState<Date>(add(startOfHour(date), { hours: 1 }));
    const [startDateOpen, setStartDateOpen] = useState(false);
    const [endDateOpen, setEndDateOpen] = useState(false);
    const [startTimeOpen, setStartTimeOpen] = useState(false);
    const [endTimeOpen, setEndTimeOpen] = useState(false);

    /*TO-DO: Create a new useEffect to replace the data with actual data if eventData.id != -1 */
    useEffect(() => {
        eventData.startDate = date;
        eventData.endDate = date;
    },[date])

    useEffect(() => {
        eventData.startTime = startTime;
        eventData.endTime = add(startOfHour(date), { hours: 2 });
    }, [])

    useEffect(() => {
        if(startTime >= formik.values.endTime){
            formik.setFieldValue('endTime', add(startTime, { hours: 1 }));
        }
    }, [startTime])
    
    

    const initialDate = startOfDay(date);

    /*TO-DO: change validateOnBlur and validateOnChange */
    const formik = useFormik({
        initialValues: eventData,
        validationSchema: eventModelValidationSchema,
        onSubmit: (values: FormikValues) => {
            setIsSubmitting(true);
            const wrappedValues = {
                id: eventData.ID,
                title: values.title,
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

    /*TO-DO: Make the modal draggable*/
    return (
        <div style={{top: '0',left: '0', zIndex: 1030, borderRadius: '8px', width: '95vw'}}>
            <div style={ popUpBoxStyle.validationBox as React.CSSProperties }>
                <div style={ popUpBoxStyle.closeIcon as React.CSSProperties }>
                    <IconButton sx={{ paddingBottom: '5px', paddingTop: 0, paddingRight: 0, paddingLeft: 0 }} onClick={handleModalClose}>
                        <CloseIcon sx={{ color: 'black' }} />
                    </IconButton>
                </div>
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
                        sx={{ paddingBottom: '10px' }}
                    />
                    <Grid container sx={{width: '100%', justifyContent: 'left'}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Grid item sx={{ display: 'flex' }}>
                                <AccessTimeIcon sx={{ color: 'black', fontSize: '30px', alignSelf: 'center', paddingRight: '10px' }}/>
                                <DatePicker
                                    name="startDate"
                                    defaultValue={initialDate}
                                    format="dd-MM-yyyy"
                                    onChange={(newDate) => {
                                        formik.setFieldValue("startDate",newDate);
                                    }}
                                    open={startDateOpen}
                                    onClose={() => setStartDateOpen(false)}
                                    sx={{
                                        width: '115px',
                                        '& .MuiInputAdornment-root': {
                                            display: 'none',
                                        },
                                    }}
                                    slotProps={{
                                        textField: {
                                            onClick: () => {
                                                setStartDateOpen(true);
                                                setEndDateOpen(false);
                                            }
                                        }
                                    }}
                                />
                                {/*TO-DO: decide whether we want to disable the save button when there is an error, or show the error? if we want
                                    to show the error, we need to add a new text box for the time, but if we want to just disable the save button,
                                    we need to find a way to highlight the textbox
                                 */}
                                {!formik.values.allDay && (
                                    <TimePicker
                                        value={formik.values.startTime}
                                        onChange={(newValue) => {
                                            setStartTime(newValue);
                                            formik.setFieldValue("startTime", newValue);
                                        }}
                                        referenceDate={formik.values.startTime}
                                        open={startTimeOpen}
                                        onClose={() => setStartTimeOpen(false)}
                                        sx={{
                                            width: '100px',
                                            paddingLeft: '5px',
                                            '& .MuiInputAdornment-root': {
                                                display: 'none',
                                            },
                                        }}
                                        slotProps={{
                                            textField: {
                                                onClick: () => {
                                                    setEndTimeOpen(false);
                                                    setStartTimeOpen(true);
                                                }
                                            }
                                        }}
                                    />
                                )}
                            </Grid>
                            <HorizontalRuleIcon
                                sx={{
                                    color: 'black',
                                    width: '10px',
                                    alignSelf: 'center',
                                    paddingLeft: '5px',
                                    paddingRight: '5px'
                                }}
                            />
                            <Grid item>
                                {!formik.values.allDay && (
                                    <TimePicker
                                        value={formik.values.endTime}
                                        onChange={(newValue) => formik.setFieldValue("endTime", newValue)}
                                        referenceDate={formik.values.endTime}
                                        open={endTimeOpen}
                                        onClose={ () => setEndTimeOpen(false)} 
                                        sx={{
                                            width: '100px',
                                            '& .MuiInputAdornment-root': {
                                                display: 'none',
                                            },
                                        }}
                                        slotProps={{
                                            textField: {
                                                onClick: () => {
                                                    setEndTimeOpen(true);
                                                    setStartTimeOpen(false);
                                                }
                                            }
                                        }}
                                    />
                                )}
                                <DatePicker
                                    name="endDate"
                                    defaultValue={initialDate}
                                    format="dd-MM-yyyy"
                                    onChange={(newDate) => formik.setFieldValue("endDate",newDate)}
                                    open={endDateOpen}
                                    onClose={() => setEndDateOpen(false)}
                                    sx={{
                                        width: '115px',
                                        paddingRight: '5px',
                                        '& .MuiInputAdornment-root': {
                                            display: 'none',
                                        },
                                    }}
                                    slotProps={{
                                        textField: {
                                            onClick: () => {
                                                setEndDateOpen(true);
                                                setStartDateOpen(false);
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                        </LocalizationProvider>
                        <FormHelperText sx={{color: 'red',width: '100%'}}>{formik.errors.endDate ? String(formik.errors.endDate) : ""}</FormHelperText>
                    </Grid>
                    <FormGroup itemType="button">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="allDay"
                                    checked={formik.values.allDay}
                                    onChange={(event) => formik.setFieldValue("allDay", event.target.checked)}
                                />
                            }
                            label="All Day"
                            sx={{ width: '30%', color: 'black', paddingLeft: '40px'}}
                        />
                    </FormGroup>
                    <Grid item sx={{ display: 'flex' }}>
                        <NotesIcon sx={{ color: 'black', fontSize: '30px', alignSelf: 'center', paddingRight: '10px' }}/>
                        <TextField
                            fullWidth
                            id="notes"
                            name="notes"
                            label="Description"
                            value={formik.values.notes}
                            onChange={formik.handleChange}
                            sx={{ paddingBottom: '10px' }}
                        />
                    </Grid>
                    
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    )
    
}

export default EventModal;