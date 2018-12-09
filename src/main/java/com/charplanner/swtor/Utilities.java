package com.charplanner.swtor;

public class Utilities
{
    private Utilities(){}

    public static void removeTrailingChar(StringBuilder sb, char c)
    {
        if(sb.charAt(sb.length()-1) == c)
        {
            sb.deleteCharAt(sb.length()-1);
        }
    }
}
