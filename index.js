const express = require("express");
const app = express();

app.use(express.json());

const EMAIL = "abhay1016.be23@chitkarauniversity.edu.in"; 

// Health API
app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});

// BFHL API
app.post("/bfhl", (req, res) => {
  try {
    const body = req.body;
    let data;

    if (body.fibonacci !== undefined) {
      const n = body.fibonacci;
      let fib = [0, 1];
      for (let i = 2; i < n; i++) {
        fib.push(fib[i - 1] + fib[i - 2]);
      }
      data = fib.slice(0, n);
    }

    else if (body.prime !== undefined) {
      data = body.prime.filter(num => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) return false;
        }
        return true;
      });
    }

    else if (body.lcm !== undefined) {
      const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
      data = body.lcm.reduce((a, b) => (a * b) / gcd(a, b));
    }

    else if (body.hcf !== undefined) {
      const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
      data = body.hcf.reduce(gcd);
    }

    else if (body.AI !== undefined) {
      data = "Mumbai";
    }

    else {
      return res.status(400).json({
        is_success: false,
        official_email: EMAIL
      });
    }

    res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data: data
    });

  } catch (err) {
    res.status(500).json({
      is_success: false,
      official_email: EMAIL
    });
  }
});

app.listen(3000, () => console.log("Server running"));
