"use client"

import type {
  ButtonProps as RawButtonProps,
} from "@radix-ui/themes"
import {
  Button as RawButton,
} from "@radix-ui/themes"

import "./styles.css"

interface ButtonProps extends RawButtonProps {
  label: string
}

export const Button = ({ label, ...rest }: ButtonProps) => {
  return <RawButton aria-label={label} {...rest} />
}
