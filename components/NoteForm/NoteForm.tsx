import css from './NoteForm.module.css'
import { useId } from "react";
import * as Yup from "yup";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from "..//../lib/api";

import type { NoteTag } from '../../types/note'; 


interface FormValues {
    title: string;
    content: string;
    tag: NoteTag;
}

const initialValues: FormValues = {
    title: "",
    content: "",
    tag: "Todo"
}

const FormSchema = Yup.object().shape({
    title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
        .required("Title is required"),
    content: Yup.string()
        .max(500, "Too long"),
    tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag is required")
});

interface NoteFormProps { 
    onClose: () => void;
    
}

export default function NoteForm({ onClose }: NoteFormProps) {
    const fieldId = useId();
     const queryClient = useQueryClient();

      const createNoteM = useMutation({
        mutationFn: createNote,
        onSuccess: () => { 
            queryClient.invalidateQueries({ queryKey: ['noteList'] });
            onClose();
           }
       });



    return (
        <Formik initialValues={initialValues} validationSchema={FormSchema} onSubmit={(values) => createNoteM.mutate(values)}>
            <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-title`}>Title</label>
                    <Field type="text" id={`${fieldId}-title`} name="title" className={css.input} />
                    < ErrorMessage name="title" component="span" className={css.error} />
                </div>
                <div className={css.formGroup}>
                     <label htmlFor={`${fieldId}-content`} >Content</label>
                    <Field as="textarea" id={`${fieldId}-content`}
                        name="content"
                        rows={8}
                        className={css.textarea} />
                    <ErrorMessage name="content" component="span" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    
                    <label htmlFor={`${fieldId}-tag`}>Tag</label>
                    <Field as="select" id={`${fieldId}-tag`} name="tag" className={css.select} >
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                </div>

                <div className={css.actions}>
                    <button type="button" className={css.cancelButton} onClick={onClose}> Cancel  </button>
                    <button type="submit" className={css.submitButton} disabled={ createNoteM.isPending} > {createNoteM.isPending ? "Creating..." : "Create note"} </button>
                </div>
            </Form>
        </Formik>
    )
}