import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
from datetime import datetime, date

# Page configuration
st.set_page_config(
    page_title="Streamlit Features Demo",
    page_icon="🚀",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Title and description
st.title("🚀 Streamlit Features Demo")
st.markdown("This app demonstrates various Streamlit features and widgets.")

# Sidebar
st.sidebar.header("Navigation")
page = st.sidebar.selectbox(
    "Choose a demo:",
    ["Basic Widgets", "Data Display", "Charts", "Layout", "Interactive Features"]
)

if page == "Basic Widgets":
    st.header("Basic Widgets")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Input Widgets")
        
        # Text input
        name = st.text_input("Enter your name:")
        if name:
            st.write(f"Hello, {name}!")
        
        # Number input
        age = st.number_input("Enter your age:", min_value=0, max_value=150, value=25)
        st.write(f"You are {age} years old")
        
        # Slider
        score = st.slider("Rate this demo (1-10):", 1, 10, 5)
        st.write(f"Your rating: {score}/10")
        
        # Date input
        birthday = st.date_input("Your birthday:", value=date(1990, 1, 1))
        st.write(f"Birthday: {birthday}")
    
    with col2:
        st.subheader("Selection Widgets")
        
        # Selectbox
        favorite_color = st.selectbox(
            "What's your favorite color?",
            ["Red", "Green", "Blue", "Yellow", "Purple"]
        )
        st.write(f"Favorite color: {favorite_color}")
        
        # Multiselect
        hobbies = st.multiselect(
            "Select your hobbies:",
            ["Reading", "Gaming", "Sports", "Music", "Cooking", "Travel"]
        )
        if hobbies:
            st.write(f"Your hobbies: {', '.join(hobbies)}")
        
        # Radio buttons
        pet_preference = st.radio(
            "Do you prefer cats or dogs?",
            ["Cats", "Dogs", "Both", "Neither"]
        )
        st.write(f"Pet preference: {pet_preference}")
        
        # Checkbox
        subscribe = st.checkbox("Subscribe to newsletter")
        if subscribe:
            st.success("Thanks for subscribing!")

elif page == "Data Display":
    st.header("Data Display")
    
    # Generate sample data
    @st.cache_data
    def load_data():
        data = {
            'Name': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
            'Age': [25, 30, 35, 28, 32],
            'City': ['New York', 'London', 'Paris', 'Tokyo', 'Sydney'],
            'Salary': [50000, 60000, 75000, 55000, 65000]
        }
        return pd.DataFrame(data)
    
    df = load_data()
    
    st.subheader("DataFrame")
    st.dataframe(df, use_container_width=True)
    
    st.subheader("Metrics")
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Total Employees", len(df))
    with col2:
        st.metric("Average Age", f"{df['Age'].mean():.1f}")
    with col3:
        st.metric("Average Salary", f"${df['Salary'].mean():,.0f}")
    with col4:
        st.metric("Cities", df['City'].nunique())
    
    st.subheader("JSON Display")
    sample_json = {
        "user": {
            "name": "John Doe",
            "email": "john@example.com",
            "preferences": {
                "theme": "dark",
                "notifications": True
            }
        }
    }
    st.json(sample_json)

elif page == "Charts":
    st.header("Charts and Visualizations")
    
    # Generate sample data for charts
    @st.cache_data
    def generate_chart_data():
        dates = pd.date_range('2024-01-01', periods=100, freq='D')
        values = np.cumsum(np.random.randn(100)) + 100
        return pd.DataFrame({'Date': dates, 'Value': values})
    
    chart_data = generate_chart_data()
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Line Chart")
        st.line_chart(chart_data.set_index('Date'))
        
        st.subheader("Bar Chart")
        bar_data = pd.DataFrame({
            'Category': ['A', 'B', 'C', 'D', 'E'],
            'Value': [23, 45, 56, 78, 32]
        })
        st.bar_chart(bar_data.set_index('Category'))
    
    with col2:
        st.subheader("Area Chart")
        st.area_chart(chart_data.set_index('Date'))
        
        st.subheader("Plotly Chart")
        fig = px.scatter(
            x=np.random.randn(50),
            y=np.random.randn(50),
            title="Random Scatter Plot"
        )
        st.plotly_chart(fig, use_container_width=True)

elif page == "Layout":
    st.header("Layout Options")
    
    st.subheader("Columns")
    col1, col2, col3 = st.columns([1, 2, 1])
    with col1:
        st.info("Left column")
    with col2:
        st.success("Middle column (wider)")
    with col3:
        st.warning("Right column")
    
    st.subheader("Tabs")
    tab1, tab2, tab3 = st.tabs(["📈 Chart", "🗃 Data", "📋 Config"])
    
    with tab1:
        st.line_chart(np.random.randn(30, 3))
    
    with tab2:
        st.write("Sample data table")
        st.dataframe(pd.DataFrame(np.random.randn(10, 3), columns=['A', 'B', 'C']))
    
    with tab3:
        st.write("Configuration options")
        st.slider("Parameter 1", 0, 100, 50)
        st.selectbox("Parameter 2", ["Option A", "Option B", "Option C"])
    
    st.subheader("Containers")
    with st.container():
        st.write("This is inside a container")
        st.bar_chart(np.random.randn(10, 3))
    
    with st.expander("Click to expand"):
        st.write("This content is hidden by default")
        st.image("https://via.placeholder.com/300x200", caption="Placeholder image")

elif page == "Interactive Features":
    st.header("Interactive Features")
    
    st.subheader("Session State")
    
    # Initialize session state
    if 'counter' not in st.session_state:
        st.session_state.counter = 0
    
    if 'messages' not in st.session_state:
        st.session_state.messages = []
    
    # Counter example
    col1, col2, col3 = st.columns(3)
    with col1:
        if st.button("Increment"):
            st.session_state.counter += 1
    with col2:
        if st.button("Decrement"):
            st.session_state.counter -= 1
    with col3:
        if st.button("Reset"):
            st.session_state.counter = 0
    
    st.write(f"Counter value: {st.session_state.counter}")
    
    st.subheader("File Upload")
    uploaded_file = st.file_uploader("Choose a CSV file", type="csv")
    if uploaded_file is not None:
        df = pd.read_csv(uploaded_file)
        st.write("Uploaded data:")
        st.dataframe(df.head())
    
    st.subheader("Progress Bar")
    if st.button("Start Progress"):
        progress_bar = st.progress(0)
        status_text = st.empty()
        
        for i in range(100):
            progress_bar.progress(i + 1)
            status_text.text(f'Progress: {i+1}%')
            
    st.subheader("Chat Interface")
    
    # Chat input
    if prompt := st.chat_input("Say something"):
        st.session_state.messages.append({"role": "user", "content": prompt})
        st.session_state.messages.append({"role": "assistant", "content": f"Echo: {prompt}"})
    
    # Display chat messages
    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

# Footer
st.markdown("---")
st.markdown("Built with ❤️ using Streamlit")