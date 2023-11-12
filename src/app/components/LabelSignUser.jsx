function LabelSignUser({ label, ...props }) {

    return (
        <label {...props}  className="text-white font-extrabold text-3xl p-10">{label}</label>
    );
}

export default LabelSignUser;