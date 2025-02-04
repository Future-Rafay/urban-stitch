"use client";
import React from 'react';

const Logo = () => (
    <svg
        width="230"
        height="60"
        viewBox="135 0 45 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer"
    >
        {/* Stitch Icon */}
        <path
            d="M30 15L40 10L60 10L70 15L68 32L68 72L32 72L32 32Z"
            fill="#FFB07B"
            stroke="#2A2A2A"
            strokeWidth="2"
            strokeLinejoin="round"
            filter="url(#shadow)"
        />

        {/* Collar with Stitch Detail */}
        <path
            d="M40 15Q50 5 60 15"
            fill="#2A2A2A"
            stroke="#2A2A2A"
            strokeWidth="1"
        />
        <line x1="45" y1="12" x2="45" y2="14" stroke="#FFB07B" strokeWidth="0.8" />
        <line x1="55" y1="12" x2="55" y2="14" stroke="#FFB07B" strokeWidth="0.8" />

        {/* Sleeves with Hemming */}
        <path
            d="M30 15L20 22L30 30"
            fill="#FFB07B"
            stroke="#2A2A2A"
            strokeWidth="2"
            strokeLinejoin="round"
        />
        <path
            d="M70 15L80 22L70 30"
            fill="#FFB07B"
            stroke="#2A2A2A"
            strokeWidth="2"
            strokeLinejoin="round"
        />

        {/* Stitch Details */}
        <g stroke="#2A2A2A" strokeWidth="0.8" strokeLinecap="round">
            {/* Horizontal Stitching */}
            <line x1="35" y1="40" x2="65" y2="40" strokeDasharray="2,2" />
            <line x1="35" y1="50" x2="65" y2="50" strokeDasharray="2,2" />
            <line x1="35" y1="60" x2="65" y2="60" strokeDasharray="2,2" />

            {/* Vertical Side Seams */}
            <line x1="32" y1="32" x2="32" y2="72" strokeDasharray="3,2" />
            <line x1="68" y1="32" x2="68" y2="72" strokeDasharray="3,2" />
        </g>

        {/* Shadow Effect */}
        <filter id="shadow">
            <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="rgba(0,0,0,0.2)" />
        </filter>

        {/* Text Logo */}
        <text
            x="85"
            y="35"
            fontFamily="'Poppins', sans-serif"
            fontSize="24"
            fontWeight="600"
            fill="#2A2A2A"
        >
            Urban<tspan fill="#FFB07B">Stitch</tspan>
        </text>
        <text
            x="100"
            y="50"
            fontFamily="'Poppins', sans-serif"
            fontSize="14"
            fontWeight="300"
            fill="#2A2A2A"
        >
            Crafted Modernity
        </text>
    </svg>
);

export default Logo;
