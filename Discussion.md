**Discussion.md**

## Solutions Considered

### 1. Loading the Entire File into Memory
- **Approach:** Read the full 1 TB log file into memory and filter lines matching the requested date.
- **Issues:** 
  - Extremely high memory usage.
  - Not feasible for large files due to RAM limitations.
  - Slow and inefficient.

### 2. Using a Database for Storage and Querying
- **Approach:** Preprocess logs and store them in a database with indexing for efficient querying.
- **Advantages:** Fast queries once indexed.
- **Issues:** 
  - Requires additional storage.
  - Preprocessing 1 TB of data takes significant time.
  - Not practical for extracting logs from an already existing large file.

### 3. Line-by-Line Streaming (Final Solution)
- **Approach:** Use file streaming to read the log file line-by-line, filter entries starting with the given date, and write them to an output file.
- **Advantages:**
  - Efficient memory usage.
  - Handles large files without performance degradation.
  - Simple implementation using file streams.
- **Final Choice:** Selected due to its efficiency and scalability.

---

## Final Solution Summary

The final solution reads the log file **line by line** to efficiently extract logs for a given date. This prevents high memory usage and ensures fast processing.

### Implementation:
- **Node.js:** Uses `fs.createReadStream` with `readline` for streaming.
- **C++:** Uses `ifstream` to read logs line-by-line.
- **Output:** Extracted logs are stored in `output/output_YYYY-MM-DD.txt`.

---

## Steps to Run

### **Node.js Implementation**
#### **Requirements:**
- Install Node.js
- Ensure `logs.log` exists in the same directory.

#### **Run the script:**
```sh
node extract_logs.js 2024-12-01
```
- Extracted logs will be saved in `output/output_2024-12-01.txt`.

---

## Performance Considerations
- **Streaming avoids high memory usage.**
- **Line-by-line filtering ensures efficient log extraction.**
- **Direct output writing eliminates large intermediate storage.**

This approach ensures optimal performance and scalability for large log files.