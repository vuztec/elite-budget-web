// CustomerService.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

/**
 * CustomerService dialog (modal) that matches the attached UI.
 *
 * Fixes included:
 * 1) Click outside closes the dialog (backdrop is behind modal; modal stops propagation).
 * 2) "I'm not a robot" checkbox is clickable.
 * 3) Form cannot submit unless checkbox is checked.
 *
 * Props:
 * - open (boolean): controls visibility
 * - onOpenChange (fn): called with (false) to close
 * - apiUrl (string): backend endpoint to receive the payload (default: "/api/customer-service")
 * - recordData (object, optional): if you want to prefill fields
 */
export default function CustomerService({ open, onOpenChange, apiUrl = '/api/customer-service', recordData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState({ ok: false, msg: '' });

  // Local checkbox (UI-gate). When you add real reCAPTCHA later, replace this with token logic.
  const [notRobotChecked, setNotRobotChecked] = useState(false);

  // For ESC close + focus safety
  const modalRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      // Keep the field for future real reCAPTCHA token usage if you want:
      recaptchaToken: '',
    },
    mode: 'onBlur',
  });

  // Optional: prefill from recordData (kept similar to your pattern)
  useEffect(() => {
    if (recordData?.id) {
      if (recordData?.Owner) setValue('name', recordData.Owner);
      if (recordData?.Email) setValue('email', recordData.Email);
      if (recordData?.Description) setValue('message', recordData.Description);
      if (recordData?.Subject) setValue('subject', recordData.Subject);
    }

    return () => {
      reset();
      setSubmitState({ ok: false, msg: '' });
      setIsSubmitting(false);
      setNotRobotChecked(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordData]);

  // Close modal + clear state
  const close = () => {
    onOpenChange?.(false);
    setSubmitState({ ok: false, msg: '' });
    setIsSubmitting(false);
    setNotRobotChecked(false);
    reset();
    clearErrors();
  };

  // ESC to close
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const titleId = useMemo(() => `cs-title-${Math.random().toString(16).slice(2)}`, []);

  // -----------------------------
  // handleOnSubmit (updated)
  // -----------------------------
  const handleOnSubmit = async (data) => {
    // Block submit unless checkbox is checked
    if (!notRobotChecked) {
      setError('recaptchaToken', {
        type: 'manual',
        message: 'Please confirm you are not a robot before submitting.',
      });
      setSubmitState({ ok: false, msg: 'Please confirm you are not a robot.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitState({ ok: false, msg: '' });

    try {
      // Keep your payload logic intact; include a simple boolean gate.
      // If you later add real reCAPTCHA, replace with token from Google.
      const payload = {
        ...data,
        recaptchaToken: 'checked', // placeholder value for your backend to ignore or later replace
      };

      await axios.post(apiUrl, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      setSubmitState({
        ok: true,
        msg: 'Your message has been sent. Please check your inbox (and spam/junk) for our reply.',
      });

      reset();
      setNotRobotChecked(false);
      clearErrors('recaptchaToken');
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Something went wrong while sending your message. Please try again.';
      setSubmitState({ ok: false, msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop: clicking it closes */}
      <div className="absolute inset-0 bg-black/70" onMouseDown={close} aria-hidden="true" />

      {/* Modal wrapper */}
      <div className="relative z-[10000] flex min-h-full items-center justify-center p-4">
        {/* Modal: stop clicks so outside click works correctly */}
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="w-full max-w-[720px] rounded-none border border-white/40 bg-black shadow-2xl"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 pt-10 text-center">
            <h2
              id={titleId}
              className="font-serif text-5xl leading-none tracking-wide text-white"
              style={{ textShadow: '0 2px 0 rgba(0,0,0,.6)' }}
            >
              CUSTOMER SERVICE
            </h2>

            <div className="mt-8 space-y-2">
              <p className="text-xl font-semibold text-white">Need help?</p>
              <p className="text-sm text-white/90">We’ve got you covered with email support.</p>
              <p className="text-sm text-white/90">
                If you don’t hear from us soon, please check your junk or spam folder—just in case!
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 pb-10 pt-8">
            <div className="mx-auto max-w-[520px] border border-white/60 px-6 py-10">
              <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className={inputClass(errors.name)}
                    {...register('name', { required: 'Name is required.' })}
                    disabled={isSubmitting}
                  />
                  {errors.name && <FieldError msg={errors.name.message} />}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className={inputClass(errors.email)}
                    {...register('email', {
                      required: 'Email is required.',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address.',
                      },
                    })}
                    disabled={isSubmitting}
                  />
                  {errors.email && <FieldError msg={errors.email.message} />}
                </div>

                {/* Subject */}
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className={inputClass(errors.subject)}
                    {...register('subject', { required: 'Subject is required.' })}
                    disabled={isSubmitting}
                  />
                  {errors.subject && <FieldError msg={errors.subject.message} />}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    rows={6}
                    placeholder="Type your message here..."
                    className={textareaClass(errors.message)}
                    {...register('message', {
                      required: 'Message is required.',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters.',
                      },
                    })}
                    disabled={isSubmitting}
                  />
                  {errors.message && <FieldError msg={errors.message.message} />}
                </div>

                {/* reCAPTCHA UI gate */}
                <div className="flex items-center justify-start">
                  <label className="flex w-full max-w-[360px] cursor-pointer items-center justify-between border border-black/20 bg-white px-4 py-3 select-none">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={notRobotChecked}
                        onChange={(e) => {
                          setNotRobotChecked(e.target.checked);
                          if (e.target.checked) {
                            clearErrors('recaptchaToken');
                            // remove any blocking message if user fixes it
                            if (submitState.msg === 'Please confirm you are not a robot.') {
                              setSubmitState({ ok: false, msg: '' });
                            }
                          }
                        }}
                        className="h-5 w-5 accent-black"
                        disabled={isSubmitting}
                      />
                      <span className="text-sm text-black">I'm not a robot</span>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-semibold text-black/70">reCAPTCHA</div>
                      <div className="text-[10px] text-black/50">Privacy - Terms</div>
                    </div>
                  </label>
                </div>

                {/* Checkbox validation message */}
                {errors.recaptchaToken?.message ? (
                  <p className="mt-1 text-xs text-red-300">{errors.recaptchaToken.message}</p>
                ) : null}

                {/* Status */}
                {submitState.msg ? (
                  <div
                    className={[
                      'rounded border px-3 py-2 text-sm',
                      submitState.ok
                        ? 'border-emerald-400/40 bg-emerald-950/40 text-emerald-100'
                        : 'border-red-400/40 bg-red-950/40 text-red-100',
                    ].join(' ')}
                  >
                    {submitState.msg}
                  </div>
                ) : null}

                {/* Actions */}
                <div className="pt-6">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting || !notRobotChecked}
                      className={[
                        'min-w-[160px] border border-[#c9aa62] bg-[#c9aa62] px-8 py-3',
                        'font-serif text-lg text-black shadow',
                        'hover:brightness-95 active:brightness-90 disabled:opacity-60 disabled:cursor-not-allowed',
                      ].join(' ')}
                      title={!notRobotChecked ? 'Please confirm you are not a robot.' : ''}
                    >
                      {isSubmitting ? 'Sending...' : 'Submit'}
                    </button>

                    <button
                      type="button"
                      onClick={close}
                      disabled={isSubmitting}
                      className="min-w-[120px] border border-white/40 bg-transparent px-6 py-3 font-serif text-lg text-white hover:bg-white/10 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Close
                    </button>
                  </div>

                  <p className="mt-4 text-center text-xs text-white/60">
                    By submitting, you agree to be contacted via email regarding your request.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------
// Small UI helpers
// -----------------
function FieldError({ msg }) {
  return <p className="mt-1 text-xs text-red-300">{msg}</p>;
}

function inputClass(hasError) {
  return [
    'w-full border bg-white px-4 py-3 text-sm text-black outline-none',
    'placeholder:text-black/50',
    hasError ? 'border-red-400' : 'border-black/30',
    'focus:border-black/60',
    'disabled:opacity-70',
  ].join(' ');
}

function textareaClass(hasError) {
  return [
    'w-full resize-none border bg-white px-4 py-3 text-sm text-black outline-none',
    'placeholder:text-black/50',
    hasError ? 'border-red-400' : 'border-black/30',
    'focus:border-black/60',
    'disabled:opacity-70',
  ].join(' ');
}
