export default function SignUp() {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <label>
          Confirm Password:
          <input type="password" name="confirm-password" />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="tel" name="phone" />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="address" />
        </label>
        <br />
        <label>
          City:
          <input type="text" name="city" />
        </label>
        <br />
        <label>
          State:
          <input type="text" name="state" />
        </label>
        <br />
        <label>
          Zip Code:
          <input type="text" name="zip" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}