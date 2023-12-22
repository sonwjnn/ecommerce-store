import { cn } from '@/lib/utils'

const CheckIcon = ({ className, size = 16 }) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

const HeartIcon = ({ className = '' }) => {
  return (
    <svg
      className={`${className} heart-icon`}
      enableBackground="new 467 392 58 57"
      viewBox="467 392 58 57"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Group"
        fill="none"
        fillRule="evenodd"
        transform="translate(467 392)"
      >
        <path
          d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
          id="heart"
          fill="#AAB8C2"
        />
        <circle
          id="main-circ"
          fill="#E2264D"
          opacity="0"
          cx="29.5"
          cy="29.5"
          r="1.5"
        />

        <g id="grp7" opacity="0" transform="translate(7 6)">
          <circle id="oval1" fill="#FF6347" cx="2" cy="6" r="2" />
          <circle id="oval2" fill="#FF4500" cx="5" cy="2" r="2" />
        </g>

        <g id="grp6" opacity="0" transform="translate(0 28)">
          <circle id="oval1" fill="#FF6347" cx="2" cy="7" r="2" />
          <circle id="oval2" fill="#FF4500" cx="3" cy="2" r="2" />
        </g>

        <g id="grp3" opacity="0" transform="translate(52 28)">
          <circle id="oval2" fill="#FF6347" cx="2" cy="7" r="2" />
          <circle id="oval1" fill="#FF4500" cx="4" cy="2" r="2" />
        </g>

        <g id="grp2" opacity="0" transform="translate(44 6)">
          <circle id="oval2" fill="#FF6347" cx="5" cy="6" r="2" />
          <circle id="oval1" fill="#FF4500" cx="2" cy="2" r="2" />
        </g>

        <g id="grp5" opacity="0" transform="translate(14 50)">
          <circle id="oval1" fill="#FFA500" cx="6" cy="5" r="2" />
          <circle id="oval2" fill="#FF6347" cx="2" cy="2" r="2" />
        </g>

        <g id="grp4" opacity="0" transform="translate(35 50)">
          <circle id="oval1" fill="#FFA500" cx="6" cy="5" r="2" />
          <circle id="oval2" fill="#FF6347" cx="2" cy="2" r="2" />
        </g>

        <g id="grp1" opacity="0" transform="translate(24)">
          <circle id="oval1" fill="#FFA500" cx="2.5" cy="3" r="2" />
          <circle id="oval2" fill="#FF6347" cx="7.5" cy="2" r="2" />
        </g>
      </g>
    </svg>
  )
}

const UserIcon = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      fill="#717171"
      focusable="false"
    >
      <path d="M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.5 6.5 0 0 1 9.5 14a6.5 6.5 0 0 1 13 0 6.51 6.51 0 0 1-3.02 5.5 12.42 12.42 0 0 1 6.45 4.4A12.67 12.67 0 0 1 16 28.7z"></path>
    </svg>
  )
}

const GithubIcon = ({ size = 18 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none">
        <g clipPath="url(#akarIconsGithubFill0)">
          <path
            fill="#000000"
            fillRule="evenodd"
            d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12"
            clipRule="evenodd"
          />
        </g>
        <defs>
          <clipPath id="akarIconsGithubFill0">
            <path fill="#fff" d="M0 0h24v24H0z" />
          </clipPath>
        </defs>
      </g>
    </svg>
  )
}

const InstagramIcon = ({ size = 18 }) => {
  return (
    <svg
      enableBackground="new 0 0 24 24"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <linearGradient
        id="SVGID_1_"
        gradientTransform="matrix(0 -1.982 -1.844 0 -132.522 -51.077)"
        gradientUnits="userSpaceOnUse"
        x1="-37.106"
        x2="-26.555"
        y1="-72.705"
        y2="-84.047"
      >
        <stop offset="0" stopColor="#fd5" />
        <stop offset=".5" stopColor="#ff543e" />
        <stop offset="1" stopColor="#c837ab" />
      </linearGradient>
      <path
        d="m1.5 1.633c-1.886 1.959-1.5 4.04-1.5 10.362 0 5.25-.916 10.513 3.878 11.752 1.497.385 14.761.385 16.256-.002 1.996-.515 3.62-2.134 3.842-4.957.031-.394.031-13.185-.001-13.587-.236-3.007-2.087-4.74-4.526-5.091-.559-.081-.671-.105-3.539-.11-10.173.005-12.403-.448-14.41 1.633z"
        fill="url(#SVGID_1_)"
      />
      <path
        d="m11.998 3.139c-3.631 0-7.079-.323-8.396 3.057-.544 1.396-.465 3.209-.465 5.805 0 2.278-.073 4.419.465 5.804 1.314 3.382 4.79 3.058 8.394 3.058 3.477 0 7.062.362 8.395-3.058.545-1.41.465-3.196.465-5.804 0-3.462.191-5.697-1.488-7.375-1.7-1.7-3.999-1.487-7.374-1.487zm-.794 1.597c7.574-.012 8.538-.854 8.006 10.843-.189 4.137-3.339 3.683-7.211 3.683-7.06 0-7.263-.202-7.263-7.265 0-7.145.56-7.257 6.468-7.263zm5.524 1.471c-.587 0-1.063.476-1.063 1.063s.476 1.063 1.063 1.063 1.063-.476 1.063-1.063-.476-1.063-1.063-1.063zm-4.73 1.243c-2.513 0-4.55 2.038-4.55 4.551s2.037 4.55 4.55 4.55 4.549-2.037 4.549-4.55-2.036-4.551-4.549-4.551zm0 1.597c3.905 0 3.91 5.908 0 5.908-3.904 0-3.91-5.908 0-5.908z"
        fill="#fff"
      />
    </svg>
  )
}

const FacebookIcon = ({ size = 18 }) => {
  return (
    <svg
      height={size}
      viewBox="0 0 512 512"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m512 256c0 141.386719-114.613281 256-256 256s-256-114.613281-256-256 114.613281-256 256-256 256 114.613281 256 256zm0 0"
        fill="#4a7aff"
      />
      <path
        d="m267.234375 511.738281c136.171875-5.878906 244.765625-118.121093 244.765625-255.738281 0-.996094-.027344-1.988281-.039062-2.984375l-177.699219-177.703125-190 198.59375 105.566406 105.566406-48.675781 66.183594zm0 0"
        fill="#0053bf"
      />
      <path
        d="m334.261719 75.3125v57.96875s-66.554688-9.660156-66.554688 33.277344v42.9375h60.113281l-7.511718 65.480468h-52.601563v170.679688h-66.554687v-170.679688l-56.894532-1.074218v-64.40625h55.820313v-49.378906s-3.683594-73.457032 68.703125-86.949219c30.058594-5.605469 65.480469 2.144531 65.480469 2.144531zm0 0"
        fill="#fff"
      />
      <path
        d="m334.261719 133.28125v-57.96875s-35.421875-7.75-65.480469-2.144531c-4.695312.875-9.0625 2.007812-13.136719 3.347656v369.140625h12.0625v-170.679688h52.597657l7.515624-65.480468h-60.113281s0 0 0-42.9375 66.554688-33.277344 66.554688-33.277344zm0 0"
        fill="#dce1eb"
      />
    </svg>
  )
}

export {
  HeartIcon,
  CheckIcon,
  UserIcon,
  GithubIcon,
  InstagramIcon,
  FacebookIcon,
}
