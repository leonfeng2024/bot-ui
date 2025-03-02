import streamlit as st
import requests
import base64
from PIL import Image
import io
import os

# Theme settings
if 'theme' not in st.session_state:
    st.session_state.theme = 'light'  # Default light theme

# Page configuration
st.set_page_config(
    page_title="AI Chat Assistant",
    page_icon="💬",
    layout="centered"
)

# Theme toggle function
def toggle_theme():
    if st.session_state.theme == 'light':
        st.session_state.theme = 'dark'
    else:
        st.session_state.theme = 'light'

# Set colors based on current theme
if st.session_state.theme == 'light':
    # Light theme
    bg_color = "#ffffff"
    text_color = "#333333"
    user_bg = "#e6f7ff"
    user_border = "#91d5ff"
    bot_bg = "#f6f6f6"
    bot_border = "#d9d9d9"
    input_bg = "#ffffff"
    input_border = "#d9d9d9"
    button_bg = "#1890ff"
    button_hover = "#40a9ff"
    button_text = "#ffffff"
    toggle_button_bg = "#f0f0f0"
    toggle_button_text = "#333333"
else:
    # Dark theme
    bg_color = "#1e1e1e"
    text_color = "#e0e0e0"
    user_bg = "#0d47a1"
    user_border = "#1565c0"
    bot_bg = "#2d2d2d"
    bot_border = "#424242"
    input_bg = "#2d2d2d"
    input_border = "#424242"
    button_bg = "#1976d2"
    button_hover = "#2196f3"
    button_text = "#ffffff"
    toggle_button_bg = "#333333"
    toggle_button_text = "#e0e0e0"

# Custom CSS for styling
st.markdown(f"""
<style>
    body {{
        background-color: {bg_color};
        color: {text_color};
    }}
    .chat-message {{
        padding: 1.5rem; 
        border-radius: 0.5rem; 
        margin-bottom: 1rem; 
        display: flex;
        align-items: flex-start;
    }}
    .chat-message.user {{
        background-color: {user_bg};
        border: 1px solid {user_border};
        color: {text_color};
    }}
    .chat-message.bot {{
        background-color: {bot_bg};
        border: 1px solid {bot_border};
        color: {text_color};
    }}
    .chat-message .avatar {{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 1rem;
    }}
    .chat-message .message {{
        flex: 1;
    }}
    .chat-message .message-content {{
        margin-top: 0.5rem;
        word-break: break-word;
    }}
    /* Input area styles */
    .stTextInput > div > div > input {{
        background-color: {input_bg};
        color: {text_color};
        border: 1px solid {input_border};
        border-radius: 8px;
        padding: 10px 15px;
        height: 45px;
        font-size: 16px;
    }}
    .stTextInput > div > div > input:focus {{
        border-color: {button_bg};
        box-shadow: 0 0 0 1px {button_bg};
    }}
    /* Button styles */
    .stButton > button {{
        background-color: {button_bg};
        color: {button_text};
        border: none;
        border-radius: 8px;
        padding: 10px 20px;
        font-size: 16px;
        font-weight: 500;
        height: 45px;
        transition: all 0.3s;
    }}
    .stButton > button:hover {{
        background-color: {button_hover};
        border-color: {button_hover};
    }}
    /* Theme toggle button */
    .theme-toggle-button {{
        background-color: {toggle_button_bg};
        color: {toggle_button_text};
        border: 1px solid {input_border};
        border-radius: 20px;
        padding: 5px 15px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
    }}
    .theme-toggle-button:hover {{
        opacity: 0.9;
    }}
    /* Chat container */
    .main {{
        margin-bottom: 100px;
        padding-bottom: 20px;
    }}

    /* Hide Streamlit default elements */
    #MainMenu {{visibility: hidden;}}
    footer {{visibility: hidden;}}
    .stDeployButton {{display: none;}}
    header {{visibility: hidden;}}
    /* Hide empty bar above input */
    .block-container {{padding-top: 1rem;}}
    .stTextInput label {{display: none;}}
    /* Fix for input element width */
    .stTextInput {{
        flex: 1;
        width: 100%;
    }}
    /* Fixed width for send button */
    .send-button-col {{
        width: 80px !important;
        flex: none !important;
    }}
</style>
""", unsafe_allow_html=True)

# Add theme toggle button
col_left, col_right = st.columns([3, 1])
with col_right:
    if st.button('🌙 Toggle Theme' if st.session_state.theme == 'light' else '☀️ Toggle Theme', key='theme_toggle'):
        toggle_theme()
        st.experimental_rerun()

# Initialize session state for chat history if it doesn't exist
if 'messages' not in st.session_state:
    st.session_state.messages = [
        {"role": "bot", "content": "Hello! I'm your AI assistant. How can I help you today?"}
    ]

# Function to encode image to base64
def get_image_base64(image_path):
    try:
        # Get the current script directory
        script_dir = os.path.dirname(os.path.abspath(__file__))
        # Create the full path to the image
        full_path = os.path.join(script_dir, image_path)
        
        with open(full_path, "rb") as img_file:
            return base64.b64encode(img_file.read()).decode('utf-8')
    except Exception as e:
        st.error(f"Error loading image: {str(e)}")
        # Create a default colored avatar if image not found
        img = Image.new('RGB', (100, 100), color=(73, 109, 137))
        buffered = io.BytesIO()
        img.save(buffered, format="PNG")
        return base64.b64encode(buffered.getvalue()).decode('utf-8')

# Avatar images - using avatars from images folder
user_avatar = get_image_base64("images/user_avatar.png")
bot_avatar = get_image_base64("images/bot_avatar.png")

# Display chat messages
st.markdown('<div class="main">', unsafe_allow_html=True)
for message in st.session_state.messages:
    if message["role"] == "user":
        avatar_img = f"data:image/png;base64,{user_avatar}"
        st.markdown(f"""
        <div class="chat-message user">
            <img src="{avatar_img}" class="avatar" alt="user avatar">
            <div class="message">
                <div class="message-sender"><strong>You</strong></div>
                <div class="message-content">{message["content"]}</div>
            </div>
        </div>
        """, unsafe_allow_html=True)
    else:
        avatar_img = f"data:image/png;base64,{bot_avatar}"
        st.markdown(f"""
        <div class="chat-message bot">
            <img src="{avatar_img}" class="avatar" alt="bot avatar">
            <div class="message">
                <div class="message-sender"><strong>AI Assistant</strong></div>
                <div class="message-content">{message["content"]}</div>
            </div>
        </div>
        """, unsafe_allow_html=True)
st.markdown('</div>', unsafe_allow_html=True)

# Function to send message to API and get response
def send_message_to_api(message):
    try:
        response = requests.post(
            "http://localhost:8000/chat",
            json={"username": "user", "query": message},
            timeout=30
        )
        response.raise_for_status()
        data = response.json()
        
        if data.get("status") == "success":
            return data.get("message", "Sorry, I couldn't understand your request.")
        else:
            return "Sorry, an error occurred. Please try again later."
    except Exception as e:
        st.error(f"API call error: {str(e)}")
        return "Sorry, an error occurred while connecting to the server. Please check your network connection or try again later."

# Create the input area that spans the full width
# Remove the outer columns to make input area full width
st.markdown('<div class="input-area">', unsafe_allow_html=True)

# Create two columns layout for input field and button
input_col, button_col = st.columns([6, 1])

with input_col:
    user_input = st.text_input("Enter your message", key="user_input", label_visibility="collapsed", placeholder="Enter your message...")

with button_col:
    send_button = st.button("Send", key="send", use_container_width=True)

st.markdown('</div>', unsafe_allow_html=True)

# Handle message submission
if send_button or (user_input and user_input != st.session_state.get("last_input", "")):
    if user_input and user_input.strip():
        # Update last input to prevent duplicate submissions
        st.session_state["last_input"] = user_input
        
        # Add user message to chat
        st.session_state.messages.append({"role": "user", "content": user_input})
        
        # Get bot response
        with st.spinner("AI is thinking..."):
            bot_response = send_message_to_api(user_input)
        
        # Add bot response to chat
        st.session_state.messages.append({"role": "bot", "content": bot_response})
        
        # Rerun to update the UI
        st.experimental_rerun() 