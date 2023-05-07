/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register, 
        handleSubmit, 
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error('Quelque chose semble coincé');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Bienvenu sur Airbnb"
                subtitle="Créer votre compte !"            
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Identifiant"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="Mot de passe"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
              outline
              label="Continuer avec Google"
              icon={FcGoogle}
              onClick={() => {}}
            />
            <Button
              outline
              label="Continuer avec Github"
              icon={AiFillGithub}
              onClick={() => {}}
            />
            <div
              className="
                text-neutral-500
                text-center
                mt-4
                font-light"
            >
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Vous avez déjà un compte ?
                    </div>
                    <div
                      onClick={registerModal.onClose} 
                      className="text-neutral-800
                      cursor-pointer
                      hover:underline"
                    >
                        S'identifier
                    </div>
                </div>
            </div>
        </div>
    )

  return (
    <Modal 
       disabled={isLoading}
       isOpen={registerModal.isOpen}
       title="Formulaire d'inscription"
       actionLabel="Continuer"
       onClose={registerModal.onClose}
       onSubmit={handleSubmit(onSubmit)}
       body={bodyContent}
       footer={footerContent}
    />
  )
}

export default RegisterModal