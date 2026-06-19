import sys
import os

# Add ai directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from career_coach.tools import registry

def test_registry():
    tools = registry.get_tools()
    print(f"Total tools registered in career_coach: {len(tools)}")
    
    for tool in tools:
        print(f"\nTool: {tool['function']['name']}")
        print(f"Schema: {tool['function']['parameters']}")
        
if __name__ == "__main__":
    test_registry()
